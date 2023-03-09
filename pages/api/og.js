import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const backgrounds = [
    {
      backgroundColor: '#e5e5f7',
      backgroundImage:
        'linear-gradient(135deg, #444cf7 25%, transparent 25%), linear-gradient(225deg, #444cf7 25%, transparent 25%), linear-gradient(45deg, #444cf7 25%, transparent 25%), linear-gradient(315deg, #444cf7 25%, #e5e5f7 25%)',
      backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat',
    },
    {
      backgroundColor: '#e5e5f7',
      backgroundImage:
        'linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777)',
      backgroundPosition: '20px 35px',
      backgroundSize: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px',
    },
    {
        backgroundColor: '#e5e5f7',
        backgroundImage: 'linear-gradient(45deg, #444cf7 50%, #e5e5f7 50%)',
        backgroundSize: '24px 24px',
    },
    {
        backgroundColor: 'white',
        backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
        backgroundSize: '100px 100px',
    }
  ];

  const randomBackgroundNumber = Math.floor(Math.random() * backgrounds.length);

export default function(NextRequest) {
    try {
        // 1: get the searchParams from the NextRequestuest URL
        const { searchParams } = new URL(NextRequest.url)

        // 2: Check if title or description are in the params
        const hasTitle = searchParams.has("title")
        const hasDescription = searchParams.has("description")

        // 3: If so, take the passed value. If not, assign a default
        const title = hasTitle
            ? searchParams.get("title")?.slice(0, 100)
            : "Some title"

        const description = hasDescription
            ? searchParams.get("description")?.slice(0, 100)
            : "Some description"

        return new ImageResponse(
            (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    ...backgrounds[randomBackgroundNumber],

                }}
            >


                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg
                        height={80}
                        viewBox="0 0 75 65"
                        fill="black"
                        style={{ margin: '0 75px' }}
                        >
                        <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
                    </svg>
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 40,
                        fontStyle: 'normal',
                        color: 'black',
                        marginTop: 30,
                        lineHeight: 1.8,
                        fontWeight: 700,
                        whiteSpace: 'pre-wrap',
                        background: '#fff',
                        padding: '20px'
                    }}
                >
                    <b>{title}</b>
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 28,
                        fontStyle: 'normal',
                        color: 'black',
                        marginTop: 10,
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                        background: '#fff',
                        padding: '20px'
                    }}
                >
                    <b>{description}</b>
                </div>
            </div>
            ),
            {
                width: 1200,
                height: 600
            }
    )
    } catch (e) {
      return new Response(`Failed to generate the image`, {
        status: 500
      })
    }
  }
