let LoggerService = {
    debugMode: true,
    log: function(type, message) {
        if(LoggerService.debugMode) {
            switch(type) {
                case "error": 
                    console.error(message);
                    break;
                case "warn":
                    console.warn(message);
                    break;
                case "table": 
                    console.table(message);
                    break;
                case "info":
                    console.info(message);
                    break;
                case "log":
                default:
                    console.log(message)
            }
        }
    }
}