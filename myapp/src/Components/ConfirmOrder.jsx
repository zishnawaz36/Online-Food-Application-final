import { Link } from "react-router-dom";

function ConfirmOrder() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <svg
            className="mx-auto mb-4 w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Thank you! Your order has been placed successfully.
          </p>
          <Link to="/mainBody" className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
