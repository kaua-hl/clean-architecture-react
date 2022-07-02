import { LocalSaveAccessToken } from "./local-save-access-token";
import { SetStorageMock } from "@/data/test/mock-storage";
import faker from "faker";

type SutTypes = {
  setStorageMock: SetStorageMock,
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call SetStorage with correct value', async () => {
    const {sut, setStorageMock} = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  it('Should throw if SetStorage throws', async () => {
    const {sut, setStorageMock} = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(() => {
      throw new Error();
    })
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });
});