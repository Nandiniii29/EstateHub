import { useSearchParams } from 'react-router-dom';
import EmiCalculatorPanel from '../components/EmiCalculatorPanel.jsx';
import './SimplePage.css';

export default function EmiCalculatorPage() {
  const [searchParams] = useSearchParams();
  const initialPrice = Number(searchParams.get('price')) || 5000000;

  return (
    <div className="simple-page emi-page">
      <div className="container">
        <h1>EMI Calculator</h1>
        <p>Plan your home loan with a clear, organized view of the monthly EMI, interest and total payment.</p>
        <EmiCalculatorPanel initialPrice={initialPrice} />
      </div>
    </div>
  );
}
