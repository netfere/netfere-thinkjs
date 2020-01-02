import { think } from 'thinkjs';
import ns from '../../../netfere-ts';

think.beforeStartServer(() => {
    think.logger.info(' server runing ' + think.config('port'));
});