import React from 'react';
import '../../styles/footer/footer.css';
import { ReactComponent as Tayttopaikka } from '../../svg/tayttopaikka.svg';
import happihakkiInstructions from '../../Files/happihakki-instructions.pdf';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="logo">
          <Tayttopaikka />
        </div>
      </div>
      <div className="row">
        <a href="https://taursu.fi" className="item">
          Tampereen Urheilusukeltajat ry
        </a>
        <a href="mailto:palaute@tayttopaikka.fi" className="item">
          Ota yhteyttä
        </a>
      </div>
      <div className="row">
        <a href="/gdpr" className="item">
          Tietosuojaseloste
        </a>
        <a href={happihakkiInstructions} download className="item">
          Happihäkin ohjeet
        </a>
      </div>
    </div>
  );
};
