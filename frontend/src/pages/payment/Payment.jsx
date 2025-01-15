import { MdOutlinePayment } from "react-icons/md";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";

const Payment = () => {
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bankAccountNumber = formData.get("bankAccountNumber");
    const password = formData.get("password");

    console.log("Bank Account Number:", bankAccountNumber);
    console.log("Password:", password);

    // Add payment logic here
  };

  return (
    <div>
      <h1>This is the payment page</h1>
      <span onClick={() => document.getElementById("paymentModal").showModal()}>
        <PrimaryButton title="Payment" icon={<MdOutlinePayment />} />
      </span>

      {/* Modal */}
      <dialog id="paymentModal" className="modal">
        <div className="modal-box">
          <form onSubmit={handlePaymentSubmit}>
            {/* Close button */}
            <button
              type="button"
              onClick={() => document.getElementById("paymentModal").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">Make a Payment</h3>

            {/* Bank Account Number Input */}
            <div className="mb-4">
              <label
                htmlFor="bankAccountNumber"
                className="block text-sm font-medium"
              >
                Bank Account Number
              </label>
              <input
                type="text"
                id="bankAccountNumber"
                name="bankAccountNumber"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your bank account number"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="modal-action">
              <PrimaryButton title="Submit" />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Payment;
