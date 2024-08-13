import React, { useRef, useEffect, useState, KeyboardEvent, FocusEvent } from 'react';

const correctOTP = "123456"; // Validate from your server

interface OtpInputProps {
  numberOfDigits: number;
  onClose: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ numberOfDigits, onClose }) => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>, index: number) => {
    e.currentTarget.select();
    console.log(otpBoxReference.current[index].value);
    // otpBoxReference.current[index].classList.add('focus:border-2', 'focus:border-blue-500');
  };

  useEffect(() => {
    if (otp.join("") !== "" && otp.join("") !== correctOTP) {
      setOtpError("❌ Wrong OTP Please Check Again");
    } else {
      setOtpError(null);
    }
  }, [otp]);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <article className="relative w-1/2 bg-white p-10 text-black">
        <button 
          onClick={onClose} 
          className="text-white absolute top-4 left-4 text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
        >
          <span>&#x2715;</span>
        </button>
        <p className="text-2xl font-medium mt-12">OTP Input With Validation</p>
        <p className="text-base text-white mt-4 bg-[#323232] p-4 rounded-md">
          A special type of input box where as user types, it checks if the otp is correct else it shows an error message below with a shake animation.
        </p>
        <p className="text-base mt-6 mb-4">One Time Password (OTP)</p>
        <div className="flex items-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => handleFocus(e, index)}
              ref={(reference) => {
                if (reference) otpBoxReference.current[index] = reference;
              }}
              className="text-center font-bold border w-20 h-auto text-black p-3 rounded-md block bg-white focus:outline-black appearance-none"
            />
          ))}
        </div>
        <p className={`text-lg text-black mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
      </article>
    </div>
  );
};

export default OtpInput;
