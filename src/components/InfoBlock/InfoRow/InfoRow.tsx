import Skeleton from 'react-loading-skeleton';
import { FieldWithValidation } from '../../common/FieldWithValidation/FieldWithValidation';
import cl from './InfoRow.module.scss';

/* ------------- Types ------------- */
interface InfoRowProps {
  isEdit: boolean;
  keyValue: string;
  value: string | boolean | undefined;
  Element: 'input' | 'textarea';
  fieldName: string;
  fieldType: string;
  fieldValidators: any[];
  className: string;
  isLoading: boolean;
}

/* ------------- Component ------------- */
const InfoRow: React.FC<InfoRowProps> = ({
  keyValue,
  value,
  isEdit,
  Element,
  fieldName,
  fieldType,
  fieldValidators,
  className,
  isLoading,
}) => {
  const ValueComponent = isLoading ? <Skeleton /> : value || 'empty';

  return (
    <div className={cl.infoRow}>
      <div className={cl.leftColumn}>{keyValue}</div>
      {isEdit && (
        <FieldWithValidation
          Element={Element}
          name={fieldName}
          type={fieldType}
          validators={fieldValidators}
          className={className}
        />
      )}
      {!isEdit && <div className={cl.rightColumn} children={ValueComponent} />}
    </div>
  );
};

export default InfoRow;
