export function findMissingAuthServices(results: any) {
  /* Detect and normalize between:
    1. The full graphql result
    2. The `result.errors` of a graphql result
    3. Apollo's GraphQL error structure
     */
  let errors =
    results &&
    // Full GraphQL result
    (results.errors ||
      // Apollo error
      results.graphQLErrors ||
      // Possibly result.errors
      results);

  // If errors aren't an array, bail
  if (!Array.isArray(errors)) {
    return [];
  }

  const missingServiceErrors = errors.filter(
    (error) => error?.extensions?.type === 'auth/missing-auth',
  );

  const missingServices = missingServiceErrors
    .map((error) => error.extensions.service)
    .filter(Boolean);

  return missingServices;
}
