import { jest } from "@jest/globals";
import { generalField, validation } from "../src/middleware/validation.middleware.js";
import { registerSchema, loginSchema, confirmEmailSchema } from "../src/Modules/Auth/auth.validation.js";

const goodUser = {
  userName: "Mostafa",
  email: "mostafa@example.com",
  password: "Str0ng!Pass",
  confirmPassword: "Str0ng!Pass",
  phoneNumber: "01012345678",
};

describe("generalField rules", () => {
  test("password needs a digit, lower and upper case letter, a symbol, and 8 to 16 characters", () => {
    const ok = (p) => !generalField.password.validate(p).error;
    expect(ok("Str0ng!Pass")).toBe(true);
    expect(ok("weakpass")).toBe(false);
    expect(ok("NoDigits!!")).toBe(false);
    expect(ok("Sh0rt!A")).toBe(false);
    expect(ok("Has Space1!A")).toBe(false);
  });

  test("phone number must be an Egyptian mobile number", () => {
    const ok = (p) => !generalField.phoneNumber.validate(p).error;
    expect(ok("01012345678")).toBe(true);
    expect(ok("+201112345678")).toBe(true);
    expect(ok("01312345678")).toBe(false);
    expect(ok("12345")).toBe(false);
  });

  test("email must end in .com or .net, and the code must be 6 digits", () => {
    expect(generalField.email.validate("a@b.com").error).toBeUndefined();
    expect(generalField.email.validate("a@b.org").error).toBeDefined();
    expect(generalField.code.validate("123456").error).toBeUndefined();
    expect(generalField.code.validate("12345").error).toBeDefined();
  });

  test("id must be a valid Mongo ObjectId", () => {
    expect(generalField.id.validate("507f1f77bcf86cd799439011").error).toBeUndefined();
    expect(generalField.id.validate("nope").error).toBeDefined();
  });
});

describe("auth schemas", () => {
  test("register accepts a complete valid body", () => {
    expect(registerSchema.validate(goodUser).error).toBeUndefined();
  });

  test("register rejects a mismatching confirmPassword", () => {
    expect(registerSchema.validate({ ...goodUser, confirmPassword: "Different1!" }).error).toBeDefined();
  });

  test("register requires every field", () => {
    const { phoneNumber, ...rest } = goodUser;
    expect(registerSchema.validate(rest).error).toBeDefined();
  });

  test("login needs email and password, confirm-email needs a 6 digit code", () => {
    expect(loginSchema.validate({ email: "a@b.com", password: "Str0ng!Pass" }).error).toBeUndefined();
    expect(loginSchema.validate({ email: "a@b.com" }).error).toBeDefined();
    expect(confirmEmailSchema.validate({ email: "a@b.com", code: "abc" }).error).toBeDefined();
  });
});

describe("validation middleware", () => {
  const res = () => {
    const r = {};
    r.status = jest.fn().mockReturnValue(r);
    r.json = jest.fn().mockReturnValue(r);
    return r;
  };

  test("calls next for valid input", () => {
    const next = jest.fn();
    validation(loginSchema)({ body: { email: "a@b.com", password: "Str0ng!Pass" }, params: {}, query: {} }, res(), next);
    expect(next).toHaveBeenCalled();
  });

  test("answers 400 with every problem for invalid input", () => {
    const r = res();
    const next = jest.fn();
    validation(loginSchema)({ body: { email: "bad" }, params: {}, query: {} }, r, next);
    expect(next).not.toHaveBeenCalled();
    expect(r.status).toHaveBeenCalledWith(400);
    const { success, message } = r.json.mock.calls[0][0];
    expect(success).toBe(false);
    expect(message.length).toBeGreaterThanOrEqual(2);
  });
});
