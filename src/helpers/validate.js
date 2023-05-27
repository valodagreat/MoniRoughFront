import * as Yup from 'yup';

// const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

export const LoginValidations = () => {
    return Yup.object().shape({
      email: Yup.string()
        .email('Invalid email, please provide a valid email.')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    });
}

export const PaymentValidations = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email, please provide a valid email.')
      .required('Email is required'),
    fullname: Yup.string().required('fullName is required'),
    phone: Yup.number().typeError('Phone Number must be a number').required('phoneNumber is required'),
    amount: Yup.number().typeError('Amount must be a number').positive("Amount must be a positive value").required('Donation Amount is required')
  });
}

export const RegisterValidations = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email, please provide a valid email.')
      .required('Email is required'),
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
    password: Yup.string().required('Password is required'),
  });
}

export const AccountValidations = () => {
  return Yup.object().shape({
    accountNumber: Yup.number()
      .typeError('Account number must be a number')
      .required('accountNumber is required').min(10, "Account number must be at least 10 characters").positive("Account number must be a positive value"),
  });
}

export const SendByAccountValidations = () => {
  return Yup.object().shape({
    accountNumber: Yup.number()
      .typeError('Account number must be a number')
      .required('accountNumber is required').min(10, "Account number must be at least 10 characters").positive("Account number must be a positive value"),
    amount: Yup.number().typeError('Amount to be donated must be a number').positive("Amount to be donated must be a positive value").required('Amount to be donated is required'),
  });
}

export const SendByEmailValidations = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email, please provide a valid email.')
      .required('Email is required'),
    amount: Yup.number().typeError('Amount to be donated must be a number').positive("Amount to be donated must be a positive value").required('Amount to be donated is required'),
  });
}

export const DonateValidations = () => {
  return Yup.object().shape({
    amount: Yup.number().typeError('Amount to be donated must be a number').positive("Amount to be donated must be a positive value").required('Amount to be donated is required'),
  });
}

export const TicketValidations = () => {
  return Yup.object().shape({
    tickets: Yup.array().of(
      Yup.object().shape({
        name: Yup.string("Ticket must be a string").required("Ticket Name is required"),
        price: Yup.number().typeError('Price must be a number').min(0,"Ticket Price must be a positive value").required("Ticket Price is required"),
        quantity: Yup.number().typeError('Quantity must be a number').positive("Ticket Quantity must be a positive value").required("Ticket Quantity is required"),
        // endSale: Yup.string("Endsale must be a string").required("Ticket End sale date is required"),
        // startSale: Yup.string("Startsale must be a string").required("Ticket Start sale is required"),
      })
    )
  })
}

export const CheckPasswordValidations = () => {
  return Yup.object().shape({
    password: Yup.string().min(5, "Password must be atleast 5 characters").required("This is a required field"),
  });
}

export const SecurityQuestionValidations = () => {
  return Yup.object().shape({
    question1:Yup.string().required("Please select a question"),
    answer1: Yup.string().required("Please input your answer"),
    question2: Yup.string().required("Please select a question"),
    answer2: Yup.string().required("Please input your answer"),
  });
}

export const CheckPasswordAndOTPValidations = () => {
  return Yup.object().shape({
    pin: Yup.string().min(4, "Password must be atleast 4 characters").required("This is a required field"),
    otp: Yup.string().min(4, "OTP must be atleast 4 characters").required("This is a required field"),
  });
}

export const ChangePasswordValidations = () => {
  return Yup.object().shape({
    password: Yup.string().required("Please input current password"),
    newPassword: Yup.string().min(8, "Password must be atleast 8 characters").required("Please input new password")
    .matches(
      /^(?=.*[a-z])/,
      "Must Contain One Lowercase Character"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Must Contain One Uppercase Character"
    )
    .matches(
      /^(?=.*[0-9])/,
      "Must Contain One Number Character"
    ),
    confirmNewPassword: Yup.string().required("this field is required").when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Passwords do not match "
      )
    }),
  })
}

export const ChangePinValidations = () => {
  return Yup.object().shape({
    currentPin: Yup.string().min(4, "Pin must be atleast 4 characters").required("Please input current pin"),
    newPin: Yup.string().min(4, "Pin must be atleast 4 characters").required("Please input new pin"),
    confirmNewPin: Yup.string().required("this field is required").when("currentPin", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPin")],
        "Pins do not match "
      )
    }),
  })
}

export const EmailValidations = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email, please provide a valid email.')
      .required('Email is required'),
  });
}

export const ResetPasswordValidations = () => {
  return Yup.object().shape({
    otp: Yup.string().min(4, "OTP must be atleast 4 characters").required("Please input OTP"),
    newPassword: Yup.string().min(8, "Password must be atleast 8 characters").required("Please input new password")
    .matches(
      /^(?=.*[a-z])/,
      "Must Contain One Lowercase Character"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Must Contain One Uppercase Character"
    )
    .matches(
      /^(?=.*[0-9])/,
      "Must Contain One Number Character"
    ),
    confirmNewPassword: Yup.string().required("this field is required").when("newPassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Passwords do not match "
      )
    }),
  })
}