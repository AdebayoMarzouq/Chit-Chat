import React from 'react'
import { Chatheader, Chatbubble, Chatinput } from '../components'

const Chatpage = () => {
  const text1 = 'Just reached my new location mate'
  const text2 =
    'Please come close, i can see you standing near the bar, Come 10 steps forward mate'
  const text3 =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore quos suscipit minima placeat, maxime natus totam voluptatibus deserunt, culpa exercitationem fugiat, nobis dolor vel! Porro, libero repellendus perferendis possimus repellat exercitationem, mollitia, nisi vitae ut sed quam tenetur ea. Corrupti quaerat voluptatibus excepturi possimus officiis impedit optio perferendis ipsam blanditiis ex numquam, odio ducimus saepe at harum rerum nisi illo deleniti libero, sit facere dolore commodi. Nostrum, tempore vel! Nobis saepe ut labore architecto, laboriosam sint sunt sequi minus dolorem facere odit magni aliquam cupiditate soluta accusamus. Est repellat in, dignissimos aliquid iusto recusandae quae consequuntur cum quibusdam doloremque rem praesentium commodi minima porro optio enim corporis molestiae ad sint esse velit suscipit dolorum deleniti? Distinctio, hic, qui veniam pariatur dignissimos sapiente placeat eos eligendi temporibus, quod alias nobis rem! Voluptates libero quae, veritatis porro iure, aspernatur sapiente aperiam officiis explicabo cumque eligendi quis et quos qui facere tenetur soluta dignissimos vero id? Maxime laudantium recusandae, assumenda officiis dolores sequi atque ut dignissimos labore soluta! Numquam ipsum sed architecto ut saepe, consequuntur deserunt ipsam pariatur similique unde enim quod ullam fuga earum laudantium autem repudiandae, nihil culpa, vero voluptates. Sapiente laboriosam et alias neque distinctio, repellat optio delectus ullam autem.'
  const text4 = 'Here you go boss'
  return (
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      <section className='space-y-4 px-4'>
        <Chatheader />
        <div className='space-y-4 overflow-y-auto'>
          <Chatbubble type='left' text={text1} />
          <Chatbubble type='right' text={text2} />
          <Chatbubble type='left' text={text3} />
          <Chatbubble type='right' text={text4} />
        </div>
      </section>
      <section className='input-footer'>
        <Chatinput />
      </section>
    </main>
  )
}

export default Chatpage
