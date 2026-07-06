import { useState } from "react";
import { toast } from "react-toastify";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function subscribe(e) {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Please enter your email.");
      return;
    }

    toast.success("Thanks for subscribing! 🎉");

    setEmail("");
  }

  return (
    <section className="newsletter">

      <div className="newsletter-content">

        <h2>Stay Inspired</h2>

        <p>
          Discover unique stays, travel inspiration and exclusive Airbnb deals.
        </p>

        <form
          className="newsletter-form"
          onSubmit={subscribe}
        >

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
}