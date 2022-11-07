
class Filters {
    constructor(data, query){
        this.data = data;
        this.query = query;
    }

    search(){
        const keyword = this.query.query ? {
            title: {
                $regex: this.query.query,
                $options: 'i'
            }
        } : {};
        this.data = this.data.find({...keyword}).sort({createdAt: -1});;
        return this;
    }

    searchCategory(){
        const keyword = this.query.category ? {
            category: this.query.category
        } : {};
        this.query = this.data.find({...keyword}).sort({createdAt: -1});;
        return this;
    }
    
}

export default Filters;