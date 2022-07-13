declare namespace Express {
    interface Request {
        /** 
         * id number of the user assumed to the request.
         */
        userId: number;

        /**
         * Token of the user sent with the request.
         */
        token: string;

        /**
         * universal unique id of the request
         */
        uuid: string;

        /**
         * universal unique id for the response
         */
        resUuid: string;
    }
}