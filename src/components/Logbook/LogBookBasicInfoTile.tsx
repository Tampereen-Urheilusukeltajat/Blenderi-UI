import { CommonTileProps } from '../BlenderLogbook/NewBlenderFillingEvent';
import { TextInput } from '../common/Inputs';

type LogBookBasicInfoTileProps = CommonTileProps;

export const LogBookBasicInfoTile: React.FC<LogBookBasicInfoTileProps> = ({
  errors,
  values,
}): JSX.Element => {
  return (
    <div className="tileWrapper">
      <h2>Esitiedot</h2>
      <div className="basicInfoGridRow">
        <TextInput
          errorText={errors.gas}
          label="Kaasu"
          placeholder="Esim. EAN32"
          name="gas"
        />
        <TextInput
          errorText={errors.additionalInformation}
          label="Lisätiedot"
          name="additionalInformation"
        />
      </div>
    </div>
  );
};
