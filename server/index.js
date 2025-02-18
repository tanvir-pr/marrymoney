const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kmpsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("marrysite").collection("users");
 

    // jwt related api
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })

    // middlewares 
    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }

    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

    // users related api
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      // insert email if user doesnt exists: 
      // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })

    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })









 
    const biodataCollection = client.db("marrysite").collection("biodatas");

    const favoriteCollection = client.db("marrysite").collection("favorites");
    
    const contactRequestCollection = client.db("marrysite").collection("contactrequest");
    const successStoryCollection  = client.db("marrysite").collection("successStories");



    //home section 
    // Route to fetch six premium biodatas with sorting by age
app.get("/api/premium-biodatas", async (req, res) => {
  const { sort } = req.query; // Get sort parameter (asc or desc)

  try {
    // Fetch six premium profiles sorted by age
    const premiumBiodatas = await biodataCollection
      .find({ isPremium: true }) // Fetch only premium biodatas
      .sort({ age: sort === "desc" ? -1 : 1 }) // Sort by age (desc or asc)
      .limit(6) // Limit to 6 profiles
      .project({
        biodataId: 1,
        type: 1,
        profileImage: 1,
        permanentDivision: 1,
        age: 1,
        occupation: 1,
      }) // Include only required fields
      .toArray();

    res.status(200).json(premiumBiodatas);
  } catch (error) {
    console.error("Error fetching premium biodatas:", error);
    res.status(500).json({ message: "Error fetching premium biodatas." });
  }
});




// Route to add a success story
app.post("/api/success-stories", async (req, res) => {
  try {
    const { selfBiodataId, partnerBiodataId, coupleImage, review, marriageDate, reviewStar } = req.body;

    if (!selfBiodataId || !partnerBiodataId || !coupleImage || !review || !marriageDate || !reviewStar) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newSuccessStory = {
      selfBiodataId,
      partnerBiodataId,
      coupleImage,
      review,
      marriageDate: new Date(marriageDate),
      reviewStar: parseInt(reviewStar, 10),
      createdAt: new Date(),
    };

    const result = await successStoryCollection.insertOne(newSuccessStory);

    res.status(201).json({ message: "Success story added!", successStory: result?.ops ? result.ops[0] : result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add success story." });
  }
});


// Route to fetch all success stories (for the home page)
app.get("/api/success-stories", async (req, res) => {
  try {
    const stories = await successStoryCollection
      .find()
      .sort({ marriageDate: -1 }) // Sort by marriage date (descending)
      .toArray();

    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch success stories." });
  }
});


    
    // Route to fetch success stories
app.get("/api/success-stories-table", async (req, res) => {
  try {
    // Fetch all success stories (or add filters for admin)
    const successStories = await successStoryCollection.find().toArray();

    if (!successStories || successStories.length === 0) {
      return res.status(404).json({ message: "No success stories found" });
    }

    res.status(200).json(successStories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching success stories." });
  }
});



    // Example API route to fetch chart data
app.get("/api/chart-data", async (req, res) => {
  try {
    const totalBiodataCount = await biodataCollection.countDocuments();
    const maleBiodataCount = await biodataCollection.countDocuments({ type: "Male" });
    const femaleBiodataCount = await biodataCollection.countDocuments({ type: "Female" });
    const premiumBiodataCount = await biodataCollection.countDocuments({ isPremium: true });

    // Assuming you have a collection for payment records,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    // const totalRevenue = await paymentCollection.aggregate([
    //   { $match: { type: "biodataContactRequest" } },
    //   { $group: { _id: null, total: { $sum: "$amount" } } }
    // ]).toArray();

    // const revenue = totalRevenue.length ? totalRevenue[0].total : 0;

    // Send back the data
    res.status(200).json({
      totalBiodataCount,
      maleBiodataCount,
      femaleBiodataCount,
      premiumBiodataCount,
      // revenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chart data" });
  }
});
    
    

// Route to fetch biodata counts and marriage statistics
app.get('/api/stats', async (req, res) => {
  try {
    const maleBiodataCount = await biodataCollection.countDocuments({ type: 'Male' });
    const femaleBiodataCount = await biodataCollection.countDocuments({ type: 'Female' });
    const completedMarriagesCount = await successStoryCollection.countDocuments({ marriageDate: { $exists: true } });

    const stats = {
      maleBiodataCount,
      femaleBiodataCount,
      completedMarriagesCount
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats." });
  }
});





    //  biodata page first

    

// API route to fetch filtered biodatas//doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// app.get("/api/biodata", async (req, res) => {
//   try {
//     const { ageRange, type, division } = req.query;
    

//     // Building the filter object
//     const filter = {};
//     if (type) filter.type = type;
//     if (division) filter.permanentDivision = division;
//     if (ageRange) {
//       const [minAge, maxAge] = ageRange.split(",").map(Number);
//       filter.age = { $gte: minAge, $lte: maxAge };
//     }

//     // Fetch filtered biodatas (limit to 20)
//     const biodatas = await biodataCollection.find(filter).limit(20).toArray();
//     res.json(biodatas);
//   } catch (error) {
//     console.error("Error fetching biodatas:", error);
//     res.status(500).send("Error fetching data");
//   }
    // }); ,
    app.get("/api/biodata",async (req, res) => {
      try {
        const { ageRange, type, division, page = 1, limit = 20 } = req.query;
    
        // Build the filter object
        const filter = {};
        if (type) filter.type = type;
        if (division) filter.permanentDivision = division;
        if (ageRange) {
          const [minAge, maxAge] = ageRange.split(",").map(Number);
          filter.age = { $gte: minAge, $lte: maxAge };
        }
    
        // Pagination logic
        const skip = (page - 1) * limit;
        const biodatas = await biodataCollection.find(filter).skip(skip).limit(parseInt(limit)).toArray();
        const total = await biodataCollection.countDocuments(filter);
    
        res.json({ biodatas, total });
      } catch (error) {
        console.error("Error fetching biodatas:", error);
        res.status(500).send("Error fetching data");
      }
    });
    
    
    
    
    
          //  details page
    
// Fetch single biodata by ID
// app.get("/api/biodata/:biodataId", async (req, res) => {
//   try {
//     const biodataId = req.params.biodataId;
//     const biodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });
//     if (!biodata) {
//       return res.status(404).json({ message: "Biodata not found" });
//     }
//     res.json(biodata);
//   } catch (error) {
//     console.error("Error fetching biodata:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
//     });
    
    // app.get("/api/biodata/:biodataId", async (req, res) => {
    //   const { biodataId } = req.params; // Get the biodataId from the URL
    //   const { email } = req.query; // Get the email of the logged-in user making the request
    //   console.log(biodataId);
    //   try {
    //     // Step 1: Find the user by email (logged-in user)
    //     const user = await userCollection.findOne({ email });
    //     if (!user) {
    //       return res.status(404).json({ message: "User not found" });
    //     }
    
    //     // Step 2: Find the biodata based on the biodataId
    //     const biodata = await biodataCollection.findOne({ _id: biodataId });
    //     if (!biodata) {
    //       return res.status(404).json({ message: "Biodata not found" });
    //     }
    
    //     // Step 3: Check if the user has premium access by checking for the 'premium' field
    //     const isPremium = user.premium && user.premiumApproved; // This checks if the user is premium
    
    //     // Step 4: Prepare the response data
    //     const responseBiodata = {
    //       ...biodata, // Include all the biodata fields
    //       isPremium: isPremium,  // Explicitly add isPremium field (true or false)
    //     };
    
    //     // Only include email and phone if the user is premium
    //     if (isPremium) {
    //       responseBiodata.email = biodata.contactEmail;
    //       responseBiodata.phone = biodata.mobileNumber;
    //     }
    
    //     // Step 5: Send the response with the biodata details
    //     res.status(200).json(responseBiodata);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Error fetching biodata." });
    //   }
    // });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    
    
    
    
    
    














    
    
    //by premium and other 
  
    // app.get("/api/biodata/:biodataId", async (req, res) => {
    //   const biodataId = req.params.biodataId;
    //   // const { email } = req.query; // Get the email of the logged-in user making the request
      
    //   try {
    //     // Step 1: Find the user by email (logged-in user)
    //     const user = await userCollection.findOne({ email });
    //     if (!user) {
    //       return res.status(404).json({ message: "User not found" });
    //     }
    
    //     // Step 2: Find the biodata based on the biodataId
    //     const biodata = await biodataCollection.findOne({_id: new ObjectId(biodataId)});
    //     if (!biodata) {
    //       return res.status(404).json({ message: "Biodata not found" });
    //     }
    
    //     // Step 3: Check if the user has premium access by checking for the 'premium' field
    //     const isPremium = user.premium && user.premiumApproved; // This checks if the user is premium
    
    //     // Step 4: Prepare the response data
    //     const responseBiodata = {
    //       ...biodata, // Include all the biodata fields
    //       isPremium: isPremium,  // Explicitly add isPremium field (true or false)
    //     };
    
    //     // Only include email and phone if the user is premium
    //     if (isPremium) {
    //       responseBiodata.email = biodata.contactEmail;
    //       responseBiodata.phone = biodata.mobileNumber;
    //     }
    
    //     // Step 5: Send the response with the biodata details
    //     res.json(responseBiodata);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Error fetching biodata." });
    //   }
    // });
    
   

app.get("/api/biodata/:biodataId", async (req, res) => {
  const biodataId = req.params.biodataId;
  const { email } = req.query; // Get the email of the logged-in user

  try {
    // Step 1: Find the user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Find the biodata based on the biodataId
    const biodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });
    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    // Step 3: Check if the user has premium access
    const isPremium = user.premium && user.premiumApproved;

    // Step 4: Prepare the response
    const responseBiodata = {
      ...biodata, // Include all biodata fields
      isPremium,  // Explicitly add isPremium field
    };

    // Only include email and phone if the user is premium
    if (isPremium) {
      responseBiodata.email = biodata.contactEmail;
      responseBiodata.phone = biodata.mobileNumber;
    } else {
      delete responseBiodata.contactEmail; // Remove sensitive data for normal users
      delete responseBiodata.mobileNumber;
    }

    // Step 5: Send the response
    res.json(responseBiodata);
  } catch (error) {
    console.error("Error fetching biodata:", error);
    res.status(500).json({ message: "Error fetching biodata." });
  }
});


    



    
    // Fetch similar biodatas
app.get("/api/biodata/:biodataId/similar", async (req, res) => {
  try {
    const biodataId = req.params.biodataId;
    const currentBiodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });
    if (!currentBiodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    const similarBiodatas = await biodataCollection
      .find({ type: currentBiodata.type, _id: { $ne: new ObjectId(biodataId) } })
      .limit(3)
      .toArray();

    res.json(similarBiodatas);
  } catch (error) {
    console.error("Error fetching similar biodatas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
    
      // favoritesBiodata   
   
    
// Add biodata to favorites
app.post("/api/favorites", async (req, res) => {
  try {
    const { biodataId, userEmail } = req.body;

    if (!biodataId || !userEmail) {
      return res.status(400).json({ message: "Biodata ID and user email are required." });
    }

    // Check if the biodata is already in favorites
    const existingFavorite = await favoriteCollection.findOne({
      biodataId: new ObjectId(biodataId),
      userEmail: userEmail,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Biodata is already in favorites." });
    }

    // Add to favorites collection
    await favoriteCollection.insertOne({
      biodataId: new ObjectId(biodataId),
      userEmail: userEmail,
      addedAt: new Date(),
    });

    res.status(200).json({ message: "Biodata added to favorites!" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Endpoint to add biodata to favorites
app.post("/api/favorites", async (req, res) => {
  const { biodataId, userEmail } = req.body;

  if (!biodataId || !userEmail) {
    return res.status(400).json({ message: "Biodata ID and user email are required." });
  }

  try {
    const favoriteCollection = database.collection("favorites");

    // Check if the biodata is already in the user's favorites
    const existingFavorite = await favoriteCollection.findOne({ biodataId: ObjectId(biodataId), userEmail });
    if (existingFavorite) {
      return res.status(400).json({ message: "This biodata is already in your favorites." });
    }

    // Insert into favorites collection
    await favoriteCollection.insertOne({ biodataId: ObjectId(biodataId), userEmail });
    res.json({ message: "Biodata added to favorites!" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
    

    
// Endpoint to get all favorite biodatas for a user
app.get("/api/favorites", async (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required." });
  }

  try {
    
    const favorites = await favoriteCollection.aggregate([
      { $match: { userEmail } },
      {
        $lookup: {
          from: "biodatas", // Assuming your biodata collection is named "biodatas"
          localField: "biodataId",
          foreignField: "_id",
          as: "biodataDetails"
        }
      },
      { $unwind: "$biodataDetails" },
      {
        $project: {
          biodataId: 1,
          name: "$biodataDetails.name",
          permanentDivision: "$biodataDetails.permanentDivision",
          occupation: "$biodataDetails.occupation"
        }
      }
    ]).toArray();

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
});


// Endpoint to delete a favorite biodata
app.delete("/api/favorites", async (req, res) => {
  const { biodataId, userEmail } = req.body;

  if (!biodataId || !userEmail) {
    return res.status(400).json({ message: "Biodata ID and user email are required." });
  }

  try {
   

    // Match the biodataId and userEmail to delete the specific favorite

    const result = await favoriteCollection.deleteOne({
      biodataId: new ObjectId(biodataId),
      userEmail: userEmail,
    });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Biodata removed from favorites." });
    } else {
      return res.status(404).json({ message: "Biodata not found in favorites." });
    }
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return res.status(500).json({ message: "Error deleting favorite." });
  }
});


    
    
    // Create or Edit Biodata   eta first er ta kaj kore na/biodatas/doneeeeeeeeeeeeeeeeeeeeeeeee
    app.post("/api/biodatas", async (req, res) => {
      try {
        const { biodataId, ...biodataInfo } = req.body;
    
        // Check if biodataId is a valid number
        if (biodataId && !Number.isNaN(Number(biodataId))) {
          const updated = await biodataCollection.updateOne(
            { biodataId },
            { $set: biodataInfo }
          );
          if (updated.modifiedCount > 0) {
            return res.status(200).json({ message: "Biodata updated successfully." });
          } else {
            return res.status(404).json({ message: "Biodata not found." });
          }
        } else {
          const lastBiodata = await biodataCollection
            .find()
            .sort({ biodataId: -1 })
            .limit(1)
            .toArray();
    
          // Ensure the last biodataId is a number
          const newId = lastBiodata.length > 0 ? Number(lastBiodata[0].biodataId) + 1 : 1;
    
          const newBiodata = { biodataId: newId, ...biodataInfo };
          await biodataCollection.insertOne(newBiodata);
          return res.status(201).json({
            message: "Biodata created successfully.",
            biodata: newBiodata,
          });
        }
      } catch (error) {
        console.error("Error creating/updating biodata:", error);
        res.status(500).json({ message: "Server error." });
      }
    });
 
    


    // view biodata page/biodatas/donennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

    // Route to fetch biodata by email
    // app.get("/api/biodata", async (req, res) => { 
    //   const { email } = req.query; // Get the email of the logged-in user making the request
    //   try {
    //     // Step 1: Find the user by email (logged-in user)
    //     const user = await userCollection.findOne({ email });
    //     if (!user) {
    //       return res.status(404).json({ message: "User not found" });
    //     }
    
    //     // Step 2: Find the biodata based on the contactEmail
    //     const biodata = await biodataCollection.findOne({ contactEmail: email });
    //     if (!biodata) {
    //       return res.status(404).json({ message: "Biodata not found" });
    //     }
    
    //     // Step 3: Check if the user has premium access by checking for the 'premium' field
    //     const isPremium = user.premium && user.premiumApproved; // This checks if the user is premium
    //     // console.log(isPremium);
    
    //     // Step 4: Prepare the response data
    //     const responseBiodata = {
    //       ...biodata, // Include all the biodata fields
    //       isPremium: isPremium,  // Explicitly add isPremium field (true or false)
    //     };
    
    //     // Only include email and phone if the user is premium
    //     if (isPremium) {
    //       responseBiodata.email = biodata.contactEmail;
    //       responseBiodata.phone = biodata.mobileNumber;
    //     }
    
    //     // Step 5: Send the response with the biodata details
    //     res.status(200).json(responseBiodata);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Error fetching biodata." });
    //   }
    // }); 
    


  // view biodata page/biodatas/donennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

// Route to fetch biodata by email
app.get("/api/biodatas", async (req, res) => {
  const { email } = req.query; // Get the email of the logged-in user making the request
  try {
  
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const biodata = await biodataCollection.findOne({ contactEmail: email });
    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    const responseBiodata = {
      ...biodata, 
    };

   

   
    res.status(200).json(responseBiodata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching biodata." });
  }
});

    
   
    
    
  











 // Request to make biodata premium
 app.post("/api/premiumrequest", async (req, res) => {
  const { biodataId } = req.body;

  try {
    const biodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });
    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found." });
    }

    if (biodata.isPremiumRequest) {
      return res.status(400).json({ message: "Premium request already submitted." });
    }

    await biodataCollection.updateOne(
      { _id: new ObjectId(biodataId) },
      { $set: { isPremiumRequest: true } }
    );

    res.status(200).json({ message: "Premium request submitted successfully." });
  } catch (error) {
    console.error("Error submitting premium request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
 });
    
    // Route to fetch premium approval requests
app.get("/dashboard/approvedPremium", async (req, res) => {
  try {
    const premiumRequests = await biodataCollection
      .find({ isPremiumRequest: true })
      .toArray();

    res.status(200).json(premiumRequests);
  } catch (error) {
    console.error("Error fetching premium requests:", error);
    res.status(500).json({ message: "Failed to fetch premium requests." });
  }
});

// Route to approve biodata as premium
app.post("/dashboard/approvedPremium/makePremium", async (req, res) => {
  const { biodataId } = req.body;

  try {
    const biodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });

    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found." });
    }

    if (!biodata.isPremiumRequest) {
      return res
        .status(400)
        .json({ message: "This biodata has not requested premium approval." });
    }

    // Approve the biodata as premium
    await biodataCollection.updateOne(
      { _id: new ObjectId(biodataId) },
      { $set: { isPremium: true, isPremiumRequest: false } }
    );

    res.status(200).json({ message: "Biodata successfully marked as premium." });
  } catch (error) {
    console.error("Error approving premium status:", error);
    res.status(500).json({ message: "Failed to approve premium status." });
  }
});

    
    

     //admin er eta __
    // Make a user premium
    //admin er eta _
    // Fetch users with optional search query
    app.get("/dashboard/manage", async (req, res) => {
      const search = req.query.search || "";
      try {
        const users = await userCollection
          .find({ name: { $regex: search, $options: "i" } })
          .toArray();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    });



 // Make a user premium
 app.post("/dashboard/manage/make-premium", async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { premium: true, premiumApproved: true } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User successfully made premium." });
  } catch (error) {
    console.error("Error making user premium:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



  // Make a user admin
// Make a user admin
app.post("/dashboard/manage/make-admin", async (req, res) => {
  const { userId } = req.body; // Expecting userId from the request body

  try {
    // Update the user's role to "admin"
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: "admin" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User successfully made admin." });
  } catch (error) {
    console.error("Error making user admin:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

    
    
    
    





app.post("/dashboard/manage/make-premium", async (req, res) => {
  const { userId } = req.body;
  try {
    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { premium: true, premiumApproved: true } }
    );
    res.status(200).json({ message: "User successfully made premium." });
  } catch (error) {
    console.error("Error making user premium:", error);
    res.status(500).json({ message: "Failed to make user premium." });
  } finally {
    await client.close();
  }
});

// Admin route to approve biodata as premium
app.put("/api/admin/biodatas/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    const biodata = await biodataCollection.findOne({ _id: ObjectId(id) });

    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    if (!biodata.isPremiumRequest) {
      return res.status(400).json({ message: "Biodata not submitted for premium approval." });
    }

    // Approve premium status
    await biodataCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: { isPremium: true, isPremiumRequest: false } }
    );

    res.status(200).json({ message: "Biodata marked as premium." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving premium biodata." });
  }
});

   
    
    
    
    
    // request page                 ,,,,,,,,,,,,,,,,,, ,,,,,,,,,,,,,
    

// Delete a contact request by its I
app.delete('/api/contact-request/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    // Attempt to delete the contact request with the given ID
    const result = await contactRequestCollection.deleteOne({ _id: new ObjectId(id) });

    // Check if the contact request was deleted
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Contact request deleted successfully!" });
    } else {
      res.status(404).json({ message: "Contact request not found." });
    }
  } catch (error) {
    // Handle errors and send an internal server error response
    console.error("Error deleting contact request:", error);
    res.status(500).json({ message: "Failed to delete contact request." });
  }
});
    // payment
    
// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send('Internal Server Error');
  }
});
    //...............................................................................................................................
        // Submit the contact request,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.post('/api/submit-contact-request', async (req, res) => {
  const { biodataId, selfEmail } = req.body;

  try {
    // Find the biodata entry using the biodataId to fetch email and mobile number
    const biodata = await biodataCollection.findOne({ _id: new ObjectId(biodataId) });

    if (!biodata) {
      return res.status(404).json({ message: 'Biodata not found.' });
    }

    // Save the contact request with "pending" status and add the relevant information (email, mobileNumber)
    const contactRequest = {
      biodataId: new ObjectId(biodataId),
      selfEmail,
      status: 'pending', // Default status
      email: biodata.contactEmail,// Add email from biodata collection
      name : biodata.name,
      mobileNumber: biodata.mobileNumber,  // Add mobile number from biodata collection
    };

    await contactRequestCollection.insertOne(contactRequest);

    res.status(200).json({ message: 'Request submitted for verification.' });
  } catch (error) {
    console.error('Error submitting contact request:', error);
    res.status(500).send('Internal Server Error');
  }
});

    // Admin can approve the request
    app.post('/api/approve-contact-request', async (req, res) => {
      const { requestId } = req.body;
    
      try {
        const result = await contactRequestCollection.updateOne(
          { _id: new ObjectId(requestId) },
          { $set: { status: 'approved' } }
        );
    
        if (result.modifiedCount > 0) {
          // Optionally, you can retrieve the updated contact request to send it back
          const updatedRequest = await contactRequestCollection.findOne({ _id: new ObjectId(requestId) });
    
          res.status(200).json({ message: 'Request approved.', updatedRequest });
        } else {
          res.status(404).json({ message: 'Request not found.' });
        }
      } catch (error) {
        console.error('Error approving contact request:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Route to get all contact requests
app.get("/api/contact-request/admin", async (req, res) => {
  try {
    // Fetch all contact requests including email and mobileNumber
    const contactRequests = await contactRequestCollection.find().toArray();

    // You can also add further filtering or pagination here if needed

    res.status(200).json(contactRequests);
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    res.status(500).json({ message: "Failed to fetch contact requests." });
  }
});
    
    
    app.get("/api/contact-request", async (req, res) => {
      try {
        const { userEmail } = req.query;
    
        // Validate that userEmail is provided
        if (!userEmail) {
          return res.status(400).json({ message: "User email is required." });
        }
    
        // Fetch contact requests for the specific user
        const contactRequests = await contactRequestCollection
          .find({ selfEmail : userEmail })
          .toArray();
    
        res.status(200).json(contactRequests);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
        res.status(500).json({ message: "Failed to fetch contact requests." });
      }
    });
    



    // Route to approve a contact request

    app.put("/api/contact-request/:id", async (req, res) => {
  const { id } = req.params; // Extract contact request ID from URL params
  const { status } = req.body; // Extract the status from the request body

  if (!status) {
    return res.status(400).json({ message: "Status is required." }); // If no status is provided, return an error
  }

  try {
    // Update the contact request with the provided status
    const result = await contactRequestCollection.updateOne(
      { _id: new ObjectId(id) }, // Match the contact request by ID
      { $set: { status: status } } // Update the status field
    );
    console.log(result);

    // Check if the contact request was modified (i.e., it exists and was updated)
    if (result.modifiedCount > 0) {
      // If modified, return success message
      res.status(200).json({ message: "Contact request approved successfully!" });
    } else {
      // If no contact request found or not updated, return error
      res.status(404).json({ message: "Contact request not found or already updated." });
    }
  } catch (error) {
    // If an error occurs, log it and return an internal server error response
    console.error("Error approving contact request:", error);
    res.status(500).json({ message: "Failed to approve contact request." });
  }
});
 
 

   
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('marry is sitting')
})

app.listen(port, () => {
  console.log(`marrrrry is sitting on port ${port}`);
})

