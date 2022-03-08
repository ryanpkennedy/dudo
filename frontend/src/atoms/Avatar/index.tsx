import { JsxElement } from 'typescript';
import Female from './Female';
import Male from './Male';

const Avatar = ({ type }: { type: 'male' | 'female' | undefined }): any => {
  if (type === 'male') {
    return (
      <div>
        <Male></Male>
      </div>
    );
  } else if (type === 'female') {
    return (
      <div>
        <Female></Female>
      </div>
    );
  }
  return <></>;
};

export default Avatar;
