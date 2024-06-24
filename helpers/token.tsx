export const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og",
  },
};

export const setConfig = (): string | null =>
  (config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og");
