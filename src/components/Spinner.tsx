import { Spinner } from 'react-bootstrap';
import '../styles/spinner/spinner.css';

export const PageLoadingSpinner = (): JSX.Element => (
  <div className="pageSpinnerOverlay">
    <div className="pageSpinnerContainer">
      <Spinner animation="border" role="status">
        {/* Accessibility */}
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  </div>
);
