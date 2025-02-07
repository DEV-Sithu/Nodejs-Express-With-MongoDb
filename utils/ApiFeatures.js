class ApiFeatures
{
 constructor(query, queryString)
 {
    this.query = query;
    this.queryString = queryString;
 }
  filter()
  {
    const queryObj = {...this.queryString};
    const excludedFields = ['page','sort','limit','fields'];
    excludedFields.forEach(field => delete queryObj[field]);
  }
  sort()
    {
        if(this.queryString.sort)
        {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
        }
        else
        {
        this.query = this.query.sort('-createdAt');
        }
    }
    pagination()
    {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
    }
    fieldSelection()
    {
        if(this.queryString.fields)
        {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
        }
        else
        {
        this.query = this.query.select('-__v');
        }
    }
    advancedFilter()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }
    advancedSort()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.sort(JSON.parse(queryStr));
    }
    advancedPagination()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }
    advancedFieldSelection()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.select(JSON.parse(queryStr));
    }
    advancedFilterAndSort()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }
    advancedFilterAndPagination()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }

    advancedFilterAndFieldSelection()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.select(JSON.parse(queryStr));
    }
    advancedFilterAndSortAndPagination()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }
    advancedFilterAndSortAndFieldSelection()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.select(JSON.parse(queryStr));
    }
    advancedFilterAndSortAndFieldSelectionAndPagination()
    {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
    }
    get()
    {
        return this.query;
    }
}
module.exports = ApiFeatures;
