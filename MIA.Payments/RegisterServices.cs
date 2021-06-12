using MIA.Infrastructure.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace MIA.Payments {
  public static class RegisterServices {
    public static IServiceCollection AddPaymentGatewayWithConfiguration(this IServiceCollection services,
      IConfiguration Configuration) {

      var scopeFactory = services
                    .BuildServiceProvider()
                    .GetRequiredService<IServiceScopeFactory>();

      using (var scope = scopeFactory.CreateScope()) {
        var provider = scope.ServiceProvider;
        var options = provider.GetRequiredService<IOptions<PaymentGatewayOptions>>();
        var optValues = options.Value;
        return services
                     .AddCheckoutSdk(new Checkout.CheckoutConfiguration(optValues.SecretKey, optValues.UseSandbox))
                     .AddScoped<IPaymentGateway, PaymentGateway>();
      }
    }
  }
}
