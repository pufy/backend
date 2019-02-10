export class Response{

    private state: any;
    private msg: string;
    private data: any;
  
    public status(type: any){
      this.msg = undefined;
      this.state = type;
      return this;
    }
  
    public message(message?){
      this.msg = message;
      return this;
    }
  
    public payload(data?){
      this.data = data;
      return {
        ...this.state,
        message: this.msg,
        payload: data
      }
    }
  }
  
  export default new Response();