import { jest } from "@jest/globals";
import { hash, compareHash } from "../src/utils/hashing/hash.js";
import { generateToken, verifyToken } from "../src/utils/token/token.js";
import { asyncHandler, globalErrorHandler } from "../src/utils/error handling/asyncHandler.js";

describe("hash helpers", () => {
  test("hash is not the plain text and compareHash accepts only the right text", () => {
    const h = hash({ plainText: "secret", saltRounds: 4 });
    expect(h).not.toBe("secret");
    expect(compareHash({ plainText: "secret", hash: h })).toBe(true);
    expect(compareHash({ plainText: "other", hash: h })).toBe(false);
  });

  test("compareHash returns false when an input is missing", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(compareHash({ plainText: "", hash: "x" })).toBe(false);
    console.error.mockRestore();
  });
});

describe("token helpers", () => {
  test("a token verifies with the same signature and carries the payload", () => {
    const token = generateToken({ payload: { id: "u1" }, signature: "sig", options: { expiresIn: "1h" } });
    expect(verifyToken({ token, signature: "sig" }).id).toBe("u1");
  });

  test("verification fails with another signature", () => {
    const token = generateToken({ payload: { id: "u1" }, signature: "sig" });
    expect(() => verifyToken({ token, signature: "wrong" })).toThrow();
  });
});

describe("error handling", () => {
  test("asyncHandler passes a rejected promise to next", async () => {
    const err = new Error("boom");
    const next = jest.fn();
    asyncHandler(async () => { throw err; })({}, {}, next);
    await new Promise((r) => setImmediate(r));
    expect(next).toHaveBeenCalledWith(err);
  });

  test("globalErrorHandler uses error.cause as the status and defaults to 500", () => {
    const mk = () => { const r = {}; r.status = jest.fn().mockReturnValue(r); r.json = jest.fn().mockReturnValue(r); return r; };
    const a = mk();
    globalErrorHandler(new Error("nope", { cause: 404 }), {}, a);
    expect(a.status).toHaveBeenCalledWith(404);
    expect(a.json.mock.calls[0][0]).toMatchObject({ success: false, message: "nope" });
    const b = mk();
    globalErrorHandler(new Error("x"), {}, b);
    expect(b.status).toHaveBeenCalledWith(500);
  });
});
