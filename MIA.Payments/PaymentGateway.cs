using Checkout;
using Checkout.Payments;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace MIA.Payments {

  public class PaymentGateway : IPaymentGateway {
    private readonly ICheckoutApi _checkoutApi;
    private readonly ILogger<PaymentGateway> _logger;
    private readonly PaymentGatewayOptions _options;

    public PaymentGateway(ICheckoutApi checkoutApi, IOptions<PaymentGatewayOptions> options, ILogger<PaymentGateway> logger) {
      this._checkoutApi = checkoutApi;
      this._logger = logger;
      this._options = options.Value;
    }

    public async Task<PaymentStatus> RequestPayment(PaymentRequest payment) {
      TokenSource source = new TokenSource(payment.CardToken);
      PaymentRequest<TokenSource> paymentRequest = new PaymentRequest<TokenSource>(source, payment.Currency, payment.Amount) {
        Capture = payment.Capture,
        Reference = payment.Reference,
        ThreeDS = payment.DoThreeDS,
        SuccessUrl = BuildUrl(_options.SuccessRoute),
        FailureUrl = BuildUrl(_options.FailRoute),
      };

      PaymentResponse response = await _checkoutApi.Payments.RequestAsync(paymentRequest);

      if (response.IsPending && response.Pending.RequiresRedirect()) {

        return new PaymentStatus {
          Status = response.Pending.Status,
          IsPending = true,
          IsApproved = false,
          ThreeDsTitle = response.Pending.GetRedirectLink().Title,
          ThreeDsUrl = response.Pending.GetRedirectLink().Href
        };//pending
      }

      if (response.Payment.Approved) {
        return new PaymentStatus {
          Status = response.Payment.Status,
          PaymentId = response.Payment.Id,
          IsApproved = response.Payment.Approved,
          ResponseCode = response.Payment.ResponseCode,
        };//success
      }

      return new PaymentStatus { Status = response.Payment.Status }; //failed
    }

    public async Task<bool> IsPaymentApproved(string sessionId) {
      try {
        //todo remove to enable validation
        return true;
        var payment = await _checkoutApi.Payments.GetAsync(sessionId);
        return payment != null && payment.Approved;
      } catch (Exception ex) {
        return false;
      }
    }

    private string BuildUrl(string url) {
      return url;
    }

    public async Task<GetPaymentResponse> GetPaymentDetails(string sessionId) {
      try {
        var payment = await _checkoutApi.Payments.GetAsync(sessionId);
        return payment;
      } catch (Exception ex) {
        _logger.LogError(ex.Message);
        throw;
      }
    }
  }
}
