export const isPublicKeyCredentialSupported = async (): Promise<boolean> => {
  try {
    if (
      window.PublicKeyCredential &&
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      PublicKeyCredential.isConditionalMediationAvailable
    ) {
      const result = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable(),
      ]);

      return result.every((r) => r === true);
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
