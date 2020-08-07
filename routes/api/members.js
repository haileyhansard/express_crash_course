const express = require('express');
const uuid = require('uuid'); //STEP 32, also make sure to npm i uuid
const router = express.Router();
const members = require('../../Members'); //STEP 16

const idFilter = req => member => member.id === parseInt(req.params.id); //STEP 26 this is needed to ...

//STEP 15
// Gets All Members
router.get('/', (req, res) => res.json(members));

//STEP 24, get a single member
// Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(idFilter(req)); //STEP 27, this is creating a way to run this condition to see if there is a member.id found or not, if yes, first thing happens, else, 2nd thing happens!

  if (found) {
    res.json(members.filter(idFilter(req))); //STEP 25 to filter thru members to return the member.id that is equal to req.params.id
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member //STEP 30 
router.post('/', (req, res) => {
  const newMember = {
    ...req.body,
    id: uuid.v4(),
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  res.json(members);
  // res.redirect('/');
});

// Update Member //STEP 33
router.put('/:id', (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    members.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updMember = {...member, ...req.body};
        members[i] = updMember
        res.json({ msg: 'Member updated', updMember });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member //STEP 34
router.delete('/:id', (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router; //STEP 16.2 export router
