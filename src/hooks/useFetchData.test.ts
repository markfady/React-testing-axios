import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useFetchData } from "./useFetchData";

const responseMock = ["some data"];

describe("useFetchData", () => {
  test("should return initial data correctly", async () => {
    const { result } = renderHook(() => useFetchData("url"));
    const { data, loading, error } = result.current;

    expect(data).toBeNull();
    expect(error).toBeNull();
    expect(loading).toBe(true);
  });

  test("should fetch data correctly", async () => {
    // Spy on the 'axios.get' method to mock its behavior
    // The first argument specifies the object or module to spy on (in this case, 'axios')
    // The second argument specifies the name of the method to spy on ('get')

    const axiosSpy = jest.spyOn(axios, "get");

    //Axios's response doesn't have a json method like the Fetch API's Response object does. Instead, Axios directly returns the response data in the data field.

    axiosSpy.mockResolvedValue({ data: responseMock });

    const { result } = renderHook(() => useFetchData("url"));

    await waitFor(() => {
      expect(result.current).toEqual({
        data: responseMock,
        error: null,
        loading: false,
      });
    });
  });

  test("should return error if failed", async () => {
    const errorResponse = new Error("error response");
    const axiosSpy = jest.spyOn(axios, "get");
    axiosSpy.mockRejectedValue(errorResponse);

    const { result } = renderHook(() => useFetchData("url"));

    await waitFor(() => {
      expect(result.current).toEqual({
        data: null,
        error: errorResponse,
        loading: false,
      });
    });
  });
});
