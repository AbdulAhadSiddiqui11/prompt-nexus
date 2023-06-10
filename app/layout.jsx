import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Prompt Nexus - where inspiration meets AI.',
  description: "Prompt Nexus: An open-source AI tool designed for today's world to discover, create, and share unique creative prompts.",
  keywords: 'AI, Language Models, ChatGPT-4, Prompts, Collaboration, Innovation, Text, Community, Artificial Intelligence, Interaction',
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;