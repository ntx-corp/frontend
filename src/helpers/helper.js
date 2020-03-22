import moment from "moment";

export const Helper = {
    formatDate(dateTime,format){
        let date = moment(dateTime).format("YYYY-MM-DD");
        return date;
    }
}