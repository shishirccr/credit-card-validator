import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import {END_POINT_VALIDATE_CC, HEADER, METHOD} from "./constants/constants"
import requestHandler from "./requests/requestHandler"

import "./App.css";

type Inputs = {
  cardNumber: number;
  expirationMonth: number;
  expirationYear: number;
  cvv: number;
};

export const CreditCardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Used to disable submit button while waiting on server-side validation
  const [waitingOnValidation, setWaitingOnValidation] = useState(false);
  const [validCreditCard, setValidCreditCard] = useState(undefined);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setWaitingOnValidation(true);
    requestHandler({
      method: METHOD,
      url: END_POINT_VALIDATE_CC,
      data: data,
      headers: HEADER,
    }).then((response) => {
      setWaitingOnValidation(false);
      setValidCreditCard(response.data.validCreditCard);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onBlur={() => {
        if (validCreditCard !== undefined) setValidCreditCard(undefined);
      }}
    >
      {validCreditCard !== undefined && !validCreditCard && (
        <div className="card-error">
          <p>Please provide a valid credit card number.</p>
        </div>
      )}
      {validCreditCard !== undefined && validCreditCard && (
          <div className="card-success">
            <p>Provided credit card number is valid.</p>
          </div>
      )}
      <div className="form-container">
        <div className="field-container">
          <label
            htmlFor="cardNumber"
            className={classNames({ fieldError: errors.cardNumber })}
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            type="number"
            inputMode="numeric"
            {...register("cardNumber", { required: true, minLength: {value: 13, message: "Credit Card should not be less than 13 digits"}, maxLength: {value: 19, message: "Credit Card should not exceed 19 digits"} })}
          />
          {errors.cardNumber?.message && <label className={classNames({ fieldError: errors.cardNumber })}>
            {errors.cardNumber?.message}
          </label>}
        </div>
        <div className="field-container">
          <label
            htmlFor="expirationMonth"
            className={classNames({ fieldError: errors.expirationMonth })}
          >
            Expiration month(mm)
          </label>
          <input
            id="expirationMonth"
            type="number"
            inputMode="numeric"
            {...register("expirationMonth", { required: true, maxLength: {value: 2, message: "Invalid value for month"} })}
          />
          {errors.expirationMonth?.message && <label className={classNames({ fieldError: errors.expirationMonth })}>
            {errors.expirationMonth?.message}
          </label>}
        </div>
        <div className="field-container">
          <label
              htmlFor="expirationYear"
              className={classNames({ fieldError: errors.expirationYear })}
          >
            Expiration year(yyyy)
          </label>
          <input
              id="expirationYear"
              type="number"
              inputMode="numeric"
              {...register("expirationYear", { required: true, maxLength: {value: 4, message: "Invalid value for year"} })}
          />
          {errors.expirationYear?.message && <label className={classNames({ fieldError: errors.expirationYear })}>
            {errors.expirationYear?.message}
          </label>}
        </div>
        <div className="field-container">
          <label
            htmlFor="cvv"
            className={classNames({ fieldError: errors.cvv })}
          >
            Security Code
          </label>
          <input
            id="cvv"
            type="number"
            inputMode="numeric"
            {...register("cvv", { required: true, minLength: {value: 3, message: "Invalid CVV"}, maxLength: {value: 4, message: "Invalid CVV"}})}
          />
          {errors.cvv?.message && <label className={classNames({ fieldError: errors.cvv })}>
            {errors.cvv?.message}
          </label>}
        </div>
        <div className="field-container">
          <div className="wrap">
            <button
              className="button"
              type="submit"
              disabled={waitingOnValidation}
            >
              {waitingOnValidation ? "Verifying Info..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreditCardForm;
