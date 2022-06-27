import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = "any_url";
    const htppPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, htppPostClientSpy);
    await sut.auth();
    expect(htppPostClientSpy.url).toBe(url);
  });
});