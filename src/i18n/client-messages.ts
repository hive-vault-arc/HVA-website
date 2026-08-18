export function withoutCrawlerOnlyMessages<T extends Record<string, unknown>>(
  messages: T,
) {
  const {Errors: omittedErrors, ...clientMessages} = messages;
  void omittedErrors;
  return clientMessages;
}
