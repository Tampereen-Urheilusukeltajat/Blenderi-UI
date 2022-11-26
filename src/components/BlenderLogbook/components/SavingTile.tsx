import { Field } from 'formik';
import { ButtonType, PrimaryButton } from '../../common/Buttons';
import { CommonTileProps } from '../NewBlenderFillingEvent';

type SavingTileProps = CommonTileProps & {
  totalPrice: number;
};

export const SavingTile: React.FC<SavingTileProps> = ({
  values,
  totalPrice,
}) => (
  <div className="tileWrapper savingTile">
    <h2>Tallenna</h2>
    <div>
      <div className="savingFlexRow">
        <span>Kokonaishinta</span>
        <span>{totalPrice} €</span>
      </div>
    </div>
    <div>
      <div className="savingFlexRow">
        <Field id="id-userConfirm" type="checkbox" name="userConfirm" />
        <label htmlFor="id-userConfirm">
          Olen tarkistanut täyttämäni arvot
        </label>
      </div>
      <PrimaryButton
        className="saveFillEventButton"
        disabled={!values.userConfirm}
        type={ButtonType.submit}
        text="Tallenna täyttö"
      />
    </div>
  </div>
);
