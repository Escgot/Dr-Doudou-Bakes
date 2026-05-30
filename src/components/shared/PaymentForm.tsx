import { useState } from 'react';
import { CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentForm({ amount, onSuccess, onBack }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (cardNumber.length < 19 || expiry.length < 5 || cvc.length < 3 || !name.trim()) {
      setError('Please fill in all card details correctly.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    // Simulate network request to Stripe
    setTimeout(() => {
      // If user typed 4242 (Stripe's test card), it succeeds. Otherwise, random chance of failure for demo.
      if (cardNumber.startsWith('4242') || Math.random() > 0.3) {
        setIsProcessing(false);
        onSuccess();
      } else {
        setIsProcessing(false);
        setError('Your card was declined. Please try another payment method.');
      }
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-primary/10 bg-cream/30 flex items-center justify-between">
        <div>
          <h3 className="text-primary font-serif text-xl flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Payment Details
          </h3>
          <p className="text-muted-foreground text-xs mt-1">Complete your purchase securely</p>
        </div>
        <div className="text-right">
          <span className="text-muted-foreground text-xs block">Amount to pay</span>
          <span className="text-primary font-serif text-xl font-bold">{amount.toFixed(2)} TND</span>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSimulatePayment} className="space-y-4">
          
          <div>
            <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Name on Card</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="JANE DOE"
              className="w-full px-4 py-3 bg-cream/20 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all uppercase"
            />
          </div>

          <div>
            <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Card Number</label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={19}
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4242 4242 4242 4242"
                className="w-full pl-10 pr-4 py-3 bg-cream/20 border border-primary/20 rounded-xl text-primary text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Expiry (MM/YY)</label>
              <input
                type="text"
                required
                maxLength={5}
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="12/26"
                className="w-full px-4 py-3 bg-cream/20 border border-primary/20 rounded-xl text-primary text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-primary text-xs font-medium tracking-wider mb-2 block">CVC</label>
              <input
                type="text"
                required
                maxLength={4}
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                className="w-full px-4 py-3 bg-cream/20 border border-primary/20 rounded-xl text-primary text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {/* Test card info */}
          <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100 mt-2">
            <p><strong>Demo Mode:</strong> This is a simulated checkout. Use card number <code>4242 4242 4242 4242</code> with any future expiry and 3-digit CVC to test a successful payment.</p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={isProcessing}
              className="px-6 py-3 border border-primary/20 text-primary rounded-xl font-medium hover:bg-cream transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-medium tracking-wide hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Pay {amount.toFixed(2)} TND
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
