export default function agoFinder (date){
    const dest = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - dest;

    const sec = diff / 1000;
    const min = diff / (1000*60);
    const hour = diff / (1000*60*60);
    const days = diff / (1000*60*60*24);
    const week = days / 6;
    const month = days / 29;
    const year = days / 365;
    if(sec < 60){
        return `${Math.floor(sec)} Sec`;
    }else if(min < 60){
        return `${Math.floor(min)} Min`;
    }else if(hour < 24){
        return `${Math.floor(hour)} Hour`;
    }else if(days < 7){
        return `${Math.floor(days)} Days`;
    }else if(week < 5){
        return `${Math.floor(week)} Week`;
    }else if(month < 12){
        return `${Math.floor(month)} Month`;
    }else{
        return `${Math.floor(year)} Year`;
    }
}