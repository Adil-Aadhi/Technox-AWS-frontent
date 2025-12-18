import api from "../../axiosConfig";

const openRazorpay = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1️⃣ Ask backend to create Razorpay order
            const res = await api.post("/api/order/payment/razorpay/create/", {
                order_id: orderId,
            });

            const {
                key,
                amount,
                currency,
                razorpay_order_id,
            } = res.data;

            // 2️⃣ Razorpay checkout options (THIS OPENS UI)
            const options = {
                key: key, // Razorpay Key ID
                amount: amount, // in paise
                currency: currency,
                name: "Technox",
                description: "Order Payment",
                order_id: razorpay_order_id,

                // ✅ This is called after successful payment
                handler: async function (response) {
                    try {
                        // 3️⃣ Verify payment on backend
                        await api.post("/api/order/payment/razorpay/verify/", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        resolve(true);
                    } catch {
                        reject("Payment verification failed");
                    }
                },

                // ✅ If user closes popup
                modal: {
                    ondismiss: function () {
                        reject("Payment cancelled");
                    },
                },

                // ✅ Prefill (optional)
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#0f172a",
                },
            };

            // 3️⃣ OPEN RAZORPAY POPUP (UI)
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            reject("Unable to initiate payment");
        }
    });
};

export default openRazorpay;
