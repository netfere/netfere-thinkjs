import { think } from 'thinkjs';

think.beforeStartServer(() => {
    think.logger.info(' server runing ' + think.config('port'));
});