import { useLocation, useNavigate } from 'react-router-dom';

export function useQueryParams(): {
  params: Record<string, string>;
  setParams: (input: Record<string, string>) => void;
  setOnlyParams: (input: Record<string, string>) => void;
} {
  const { search } = useLocation();
  const navigate = useNavigate();
  return {
    params: deserializeParams(search),
    setParams: (params) => {
      const serializedParams = serializeParams({
        existingSerializedParams: search,
        params,
      });
      navigate(`?${serializedParams}`);
    },
    setOnlyParams: (params) => {
      const serializedParams = serializeParams({ params });
      navigate(`?${serializedParams}`);
    },
  };
}

function serializeParams({
  existingSerializedParams = '',
  params,
}: {
  existingSerializedParams?: string;
  params: Record<string, string>;
}): string {
  const deserializedParams = new URLSearchParams(existingSerializedParams);
  Object.entries(params).forEach(([key, value]) => {
    deserializedParams.set(key, value);
  });
  return deserializedParams.toString();
}

function deserializeParams(serializedParams: string): Record<string, string> {
  const result: Record<string, string> = {};
  new URLSearchParams(serializedParams).forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
