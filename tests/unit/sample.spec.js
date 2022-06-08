import { floatArray, stubImageInArray, stubImageInObject } from "./sample";

describe('Simple unit test', () => {
  const mockNotFloatArray = [
    [
      '0',
      {
        name: 'name',
        age: 10,
        image: '',
        backgroundImage: '',
        description: 'description',
      }
    ],
  ];

  const mockObject = {
    name: 'name',
    age: 10,
    image: 'images',
    backgroundImage: 'backgroundImage',
    description: 'bsjbbcacba',
  };

  it('test floatArray', () => {
    const result = floatArray(mockNotFloatArray);

    expect(result).toEqual([{
      name: 'name',
      age: 10,
      image: '',
      backgroundImage: '',
      description: 'description',
      }
    ])
  })

  it('Test stubImageInArray', () => {
    const result = stubImageInArray([mockObject])

    expect(result).toEqual([
      {
        name: 'name',
        age: 10,
        image: '',
        backgroundImage: '',
        description: 'description',
      },
    ]);
  });

  it('Test stubImageInObject', () => {
    const result = stubImageInObject(mockObject)

    expect(result).toEqual({
      name: 'name',
      age: 10,
      image: '',
      backgroundImage: '',
      description: 'description',
    });
  });
})