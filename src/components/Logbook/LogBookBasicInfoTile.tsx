import { LogbookCommonTileProps } from '../BlenderLogbook/NewBlenderFillingEvent';
import { TextInput } from '../common/Inputs';

type LogbookBasicInfoTileProps = LogbookCommonTileProps;

export const LogbookBasicInfoTile: React.FC<LogbookBasicInfoTileProps> = ({
  errors,
  values,
}): JSX.Element => {
  return (
    <div className="tileWrapper">
      <h2>Esitiedot</h2>
      <div className="basicInfoGridRow">
        <TextInput
          name="gasMixture"
          label="Kaasu"
          disabled
          placeholder="Paineilma"
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
