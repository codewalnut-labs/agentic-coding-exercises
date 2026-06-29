const vendorRiskClient = {
  async lookupVendorRisk(vendorName) {
    const response = await fetch(`https://vendor-risk.example.com/score?vendor=${vendorName}`);
    const body = await response.json();
    return body.score;
  },
};

module.exports = { vendorRiskClient };

