import Condition from '../mocks/condition.json';
const mapConditionToDisplay = (condition: string) => {
  return Condition.find((item) => item.value === condition)?.label ?? condition;
};

export default mapConditionToDisplay;
