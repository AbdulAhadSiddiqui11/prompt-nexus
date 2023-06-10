import '@styles/globals.css';

export const metadata = {
  title: 'Prompt Nexus',
  description: 'Introducing Prompt Nexus, a groundbreaking web application that unites creative minds and AI enthusiasts in a vibrant community centered around text prompts for large language models like ChatGPT-4. Collaborate, innovate, and interact with advanced AI-powered language models, while expanding your creative horizons and pushing the boundaries of linguistic possibilities. Prompt Nexus - where inspiration meets AI.',
  keywords: 'AI, Language Models, ChatGPT-4, Prompts, Collaboration, Innovation, Text, Community, Artificial Intelligence, Interaction',
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;