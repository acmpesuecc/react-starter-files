import { version as packageVersion } from '../../../package.json';

const version = () => {
    console.log(packageVersion);
}

export default version;