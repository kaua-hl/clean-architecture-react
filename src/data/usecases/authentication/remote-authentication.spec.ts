import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = "any_url";
    const htppPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, htppPostClientSpy);
    await sut.auth();
    expect(htppPostClientSpy.url).toBe(url);
  });
});