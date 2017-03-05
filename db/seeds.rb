jeff = User.create(username: 'Jeff', password: "x", password_confirmation: "x")
philip = User.create(username: 'Philip', password: "x", password_confirmation: "x")
elaine = User.create(username: 'Elaine', password: "x", password_confirmation: "x")
sarah = User.create(username: 'Sarah', password: "x", password_confirmation: "x")
morgan = User.create(username: 'Morgan', password: "x", password_confirmation: "x")
eshan = User.create(username: 'Eshan', password: "x", password_confirmation: "x")

eshan_topic = Post.create(text: "Annual BBQ is next month, let's start planning!", user_id: eshan.id, created_at: Date.parse("2016-12-30"))
  a = Post.create(text: "I can't go because my dog made it to the 4H semifinals that day.", user_id: morgan.id, created_at: Date.parse("2016-12-31"))
  a.parent_id = eshan_topic.id
  a.save
    b = Post.create(text: "Wow. That's great, congratulations!", user_id: sarah.id, created_at: Date.parse("2017-1-1"))
    b.parent_id = a.id
    b.save
      c = Post.create(text: "Thanks! Strudle and I have been working very hard for this.", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
      c.parent_id = b.id
      c.save
    d = Post.create(text: "We'll miss you at the BBQ but good luck!", user_id: jeff.id, created_at: Date.parse("2017-1-1"))
    d.parent_id = a.id
    d.save
  e = Post.create(text: "Am I grillmaster again this year?", user_id: jeff.id, created_at: Date.parse("2016-12-31"))
  e.parent_id = eshan_topic.id
  e.save
    f = Post.create(text: "Yup ;)", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
    f.parent_id = e.id
    f.save
  g = Post.create(text: "I'll be there! (I'll bring fruit salad again)", user_id: philip.id, created_at: Date.parse("2017-1-1"))
  g.parent_id = eshan_topic.id
  g.save

sarah_topic = Post.create(text: "Is something strange going on in this office?", user_id: sarah.id, created_at: Date.parse("2016-12-30"))
  h = Post.create(text: "Like what?", user_id: elaine.id, created_at: Date.parse("2016-12-31"))
  h.parent_id = sarah_topic.id
  h.save
    i = Post.create(text: "That sound. Anyone else hear that.", user_id: sarah.id, created_at: Date.parse("2017-1-1"))
    i.parent_id = h.id
    i.save
      j = Post.create(text: "The bird chirping sound? I hearing that?", user_id: philip.id, created_at: Date.parse("2017-1-1"))
      j.parent_id = i.id
      j.save
        k = Post.create(text: "Oh I have heard that!", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
        k.parent_id = j.id
        k.save
        l = Post.create(text: "No that's a bird. I mean the whirring sound.", user_id: sarah.id, created_at: Date.parse("2017-1-1"))
        l.parent_id = j.id
        l.save
  m = Post.create(text: "No!", user_id: morgan.id, created_at: Date.parse("2016-12-31"))
  m.parent_id = sarah_topic.id
  m.save
    n = Post.create(text: "Sounds like Morgan knows what it is!!!", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
    n.parent_id = m.id
    n.save
      o = Post.create(text: "I don't! Go away!", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
      o.parent_id = n.id
      o.save
  ppp = Post.create(text: "It's Morgan's minifridge, he's hiding it in his desk.", user_id: eshan.id, created_at: Date.parse("2017-1-1"))
  ppp.parent_id = sarah_topic.id
  ppp.save

morgan_topic = Post.create(text: "Need help with TPS reports :/", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
  q = Post.create(text: "We're not doing those anymore", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
  q.parent_id = morgan_topic.id
  q.save
    r = Post.create(text: "Are you sure?", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
    r.parent_id = q.id
    r.save  
      s = Post.create(text: "Confirmed no more TPS reports :)", user_id: philip.id, created_at: Date.parse("2017-1-1"))
      s.parent_id = r.id
      s.save
      t = Post.create(text: "I'm sure. Why do you always ask me if I'm sure?", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
      t.parent_id = r.id
      t.save
        u = Post.create(text: "Sorry", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
        u.parent_id = t.id
        u.save
  v = Post.create(text: "Morgan. No. We don't do those anymore. Read your memos!", user_id: philip.id, created_at: Date.parse("2017-1-1"))
  v.parent_id = morgan_topic.id
  v.save


philip_topic = Post.create(text: "What do we think about the show Fargo?", user_id: philip.id, created_at: Date.parse("2016-12-29"))
  w = Post.create(text: "I think it's overrated.", user_id: elaine.id, created_at: Date.parse("2016-12-30"))
  w.parent_id = philip_topic.id
  w.save  
    x = Post.create(text: "Lies.", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
    x.parent_id = w.id
    x.save
    y = Post.create(text: "Seconded. Definitely overrated. Just one good casting win and nothing else; like True Detective but one less casting win.", user_id: eshan.id, created_at: Date.parse("2016-12-30"))
    y.parent_id = w.id
    y.save
  z = Post.create(text: "What is that?", user_id: morgan.id, created_at: Date.parse("2016-12-30"))
  z.parent_id = philip_topic.id
  z.save
    aa = Post.create(text: "Show inspired by the Cohen brothers film.", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
    aa.parent_id = z.id
    aa.save
      bb = Post.create(text: "Never heard of them.", user_id: morgan.id, created_at: Date.parse("2016-12-30"))
      bb.parent_id = aa.id
      bb.save
        cc = Post.create(text: "The movies called Fargo too. It's based on that.", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
        cc.parent_id = bb.id
        cc.save
          dd = Post.create(text: "Never heard of it.", user_id: morgan.id, created_at: Date.parse("2016-12-30"))
          dd.parent_id = cc.id
          dd.save
            ee = Post.create(text: "Billy Bob Thorton is in it.", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
            ee.parent_id = dd.id
            ee.save
              ff = Post.create(text: "HE IS!!!!!.", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
              ff.parent_id = ee.id
              ff.save
                gg = Post.create(text: "Yes.", user_id: jeff.id, created_at: Date.parse("2017-1-1"))
                gg.parent_id = ff.id
                gg.save
                hh = Post.create(text: "Wow someone likes Billy Bob.", user_id: elaine.id, created_at: Date.parse("2017-1-1"))
                hh.parent_id = ff.id
                hh.save
  ii = Post.create(text: "Haven't seen it.", user_id: sarah.id, created_at: Date.parse("2016-12-30"))
  ii.parent_id = philip_topic.id
  ii.save
    jj = Post.create(text: "Get thee to a television!", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
    jj.parent_id = ii.id
    jj.save
  kk = Post.create(text: "It's bad. Stay away.", user_id: sarah.id, created_at: Date.parse("2016-12-30"))
  kk.parent_id = philip_topic.id
  kk.save
    ll = Post.create(text: "You are wrong!", user_id: jeff.id, created_at: Date.parse("2016-12-30"))
    ll.parent_id = kk.id
    ll.save
  mm = Post.create(text: "I JUST FOUND OUT BILLY BOB IS IN IT!!!", user_id: morgan.id, created_at: Date.parse("2017-1-1"))
  mm.parent_id = philip_topic.id
  mm.save