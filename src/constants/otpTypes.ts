/**
 * OTP verification types matching backend expectations
 * Backend file: auth_integration/serializers.py - ResendOTPSerializer
 */
export const OTP_TYPES = {
  REGISTRATION: 'registration',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
  PHONE_VERIFICATION: 'phone_verification',
} as const;

export type OTPType = typeof OTP_TYPES[keyof typeof OTP_TYPES];

/**
 * Helper to validate OTP type
 */
export const isValidOTPType = (type: string): type is OTPType => {
  return Object.values(OTP_TYPES).includes(type as OTPType);
};