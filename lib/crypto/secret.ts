const secret = process.env.HMAC_SECRET;
if (!secret) {
  throw new Error("HMAC_SECRET is not defined");
}

export { secret };
