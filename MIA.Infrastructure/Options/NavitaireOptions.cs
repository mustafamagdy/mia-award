using System;

namespace MIA.Infrastructure.Options {
  public class NavitaireOptions {
    public int ContractVersion { get; set; }
    public string AccountNumber { get; set; }
    public long AccountNumberID { get; set; }
    public DateTime ExpirationDate { get; set; }
    public string DomainCode { get; set; }
    public string AgentName { get; set; }
    public string Password { get; set; }
  }
}