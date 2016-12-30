jeff = User.create(username: 'Jeff', password: "x", password_confirmation: "x")
philip = User.create(username: 'Philip', password: "x", password_confirmation: "x")
elaine = User.create(username: 'Elaine', password: "x", password_confirmation: "x")
sarah = User.create(username: 'Sarah', password: "x", password_confirmation: "x")
morgan = User.create(username: 'Morgan', password: "x", password_confirmation: "x")
eshan = User.create(username: 'Eshan', password: "x", password_confirmation: "x")

eshan_topic = Post.create(text: "Annual BBQ is next month, let's start planning!", user_id: eshan.id)
  a = Post.create(text: "I can't go because my dog made it to the 4H semifinals that day.", user_id: morgan.id)
  a.parent_id = eshan_topic.id
  a.save
    b = Post.create(text: "Wow. That's great, congratulations!", user_id: sarah.id)
    b.parent_id = a.id
    b.save
      c = Post.create(text: "Thanks! Strudle and I have been working very hard for this.", user_id: morgan.id)
      c.parent_id = b.id
      c.save
    d = Post.create(text: "We'll miss you at the BBQ but good luck!", user_id: jeff.id)
    d.parent_id = a.id
    d.save
  e = Post.create(text: "Am I grillmaster again this year?", user_id: jeff.id)
  e.parent_id = eshan_topic.id
  e.save
    f = Post.create(text: "Yup ;)", user_id: elaine.id)
    f.parent_id = e.id
    f.save
  d = Post.create(text: "I'll be there! (I'll bring fruit salad again)", user_id: philip.id)
  d.parent_id = eshan_topic.id
  d.save

sarah_topic = Post.create(text: "Is something strange going on in this office?", user_id: sarah.id)
  a = Post.create(text: "Like what?", user_id: elaine.id)
  a.parent_id = sarah_topic.id
  a.save
    b = Post.create(text: "That sound. Anyone else hear that.", user_id: sarah.id)
    b.parent_id = a.id
    b.save
      c = Post.create(text: "The bird chirping sound? I hearing that?", user_id: philip.id)
      c.parent_id = b.id
      c.save
        d = Post.create(text: "Oh I have heard that!", user_id: elaine.id)
        d.parent_id = c.id
        d.save
        e = Post.create(text: "No that's a bird. I mean the whirring sound.", user_id: sarah.id)
        e.parent_id = c.id
        e.save
  f = Post.create(text: "No!", user_id: morgan.id)
  f.parent_id = sarah_topic.id
  f.save
    g = Post.create(text: "Sounds like Morgan knows what it is!!!", user_id: elaine.id)
    g.parent_id = f.id
    g.save
      h = Post.create(text: "I don't! Go away!", user_id: morgan.id)
      h.parent_id = g.id
      h.save
  i = Post.create(text: "It's Morgan's minifridge, he's hiding it in his desk.", user_id: eshan.id)
  i.parent_id = sarah_topic.id
  i.save

morgan_topic = Post.create(text: "Need help with TPS reports :/", user_id: morgan.id)
  a = Post.create(text: "We're not doing those anymore", user_id: elaine.id)
  a.parent_id = morgan_topic.id
  a.save
    b = Post.create(text: "Are you sure?", user_id: morgan.id)
    b.parent_id = a.id
    b.save  
      c = Post.create(text: "Confirmed no more TPS reports :)", user_id: philip.id)
      c.parent_id = b.id
      c.save
      d = Post.create(text: "I'm sure. Why do you always ask me if I'm sure?", user_id: elaine.id)
      d.parent_id = b.id
      d.save
        e = Post.create(text: "Sorry", user_id: morgan.id)
        e.parent_id = d.id
        e.save
  f = Post.create(text: "Morgan. No. We don't do those anymore. Read your memos!", user_id: philip.id)
  f.parent_id = morgan_topic.id
  f.save


philip_topic = Post.create(text: "What do we think about the show Fargo?", user_id: philip.id)
  a = Post.create(text: "I think it's overrated.", user_id: elaine.id)
  a.parent_id = philip_topic.id
  a.save  
    b = Post.create(text: "Lies.", user_id: jeff.id)
    b.parent_id = a.id
    b.save
    c = Post.create(text: "Seconded. Definitely overrated. Just one good casting win and nothing else; like True Detective but one less casting win.", user_id: eshan.id)
    c.parent_id = a.id
    c.save
  d = Post.create(text: "What is that?", user_id: morgan.id)
  d.parent_id = philip_topic.id
  d.save
    e = Post.create(text: "Show inspired by the Cohen brothers film.", user_id: jeff.id)
    e.parent_id = d.id
    e.save
      f = Post.create(text: "Never heard of them.", user_id: morgan.id)
      f.parent_id = e.id
      f.save
        g = Post.create(text: "The movies called Fargo too. It's based on that.", user_id: jeff.id)
        g.parent_id = f.id
        g.save
          h = Post.create(text: "Never heard of it.", user_id: morgan.id)
          h.parent_id = g.id
          h.save
            i = Post.create(text: "Billy Bob Thorton is in it.", user_id: jeff.id)
            i.parent_id = h.id
            i.save
              j = Post.create(text: "HE IS!!!!!.", user_id: morgan.id)
              j.parent_id = i.id
              j.save
                k = Post.create(text: "Yes.", user_id: jeff.id)
                k.parent_id = j.id
                k.save
                l = Post.create(text: "Wow someone likes Billy Bob.", user_id: elaine.id)
                l.parent_id = j.id
                l.save
  m = Post.create(text: "Haven't seen it.", user_id: sarah.id)
  m.parent_id = philip_topic.id
  m.save
    n = Post.create(text: "Get thee to a television!", user_id: jeff.id)
    n.parent_id = m.id
    n.save
  o = Post.create(text: "It's bad. Stay away.", user_id: sarah.id)
  o.parent_id = philip_topic.id
  o.save
    q = Post.create(text: "You are wrong!", user_id: jeff.id)
    q.parent_id = o.id
    q.save
  r = Post.create(text: "I JUST FOUND OUT BILLY BOB IS IN IT!!!", user_id: morgan.id)
  r.parent_id = philip_topic.id
  r.save