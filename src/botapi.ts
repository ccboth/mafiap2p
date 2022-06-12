import { strictEqual } from "assert";
import { resolve } from "url";

interface Update {
  update_id: number;
  message?: Message;
  channel_post?: Message;
}

interface Message {
  text: string;
  message_id: number;
}

interface RequestApi {
  chat_id?: number;
  user_id?: number;
  message_id?: number;
  text?: string;
  offset?: number;
  limit?: number;
  timeout?: number;
  allowed_updates?: string[];
}

interface Chat {
  id: number;
  type: string;
  title: string;
  pinned_message: Message;

}

export default class Bot {

  private async request<Type = any>(method:string, data:RequestApi = {}) {
    const resp = await fetch(`https://api.telegram.org/bot${this._token}/${method}`, {
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
      method: "POST",
    });
    const json = await resp.json();
    return json.result as Type;
  }

  constructor (private _token:string) {}

  public getMe() {
    return this.request<Chat>("getMe");
  }

  public getChat(chat_id:number) {
    return this.request<Chat>("getChat", {chat_id: chat_id});
  }

  public sendMessage(chat_id: number, text:string) {
    this.request("sendMessage", {
      chat_id: chat_id,
      text: text
    });
  }

  public editMessageText(chat_id: number, message_id: number, text: string) {
    this.request("editMessageText", {
      chat_id: chat_id,
      message_id: message_id,
      text: text
    })
    
  }

  public async getPinnedMessage(chat_id:number) {
    return (await this.getChat(chat_id)).pinned_message;
  }

  public getUpdates() {
    return this.request<Update[]>("getUpdates", {allowed_updates: ["channel_post"], timeout: 100, offset: 100})
  }

}