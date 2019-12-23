using Checkout.Payments;
using System;
using System.Threading.Tasks;

namespace MIA.Payments {
  public interface IPaymentGateway {
    Task<PaymentStatus> RequestPayment(PaymentRequest payment);
    Task<bool> IsPaymentApproved(string sessionId);
    Task<GetPaymentResponse> GetPaymentDetails(string sessionId);
  }
}
